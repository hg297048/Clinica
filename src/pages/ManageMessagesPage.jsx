
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, User, Calendar, MessageSquare, CornerDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const ManageMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      toast({ title: "Error", description: "No se pudieron cargar los mensajes.", variant: "destructive" });
    } else {
      setMessages(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchMessages();
    const channel = supabase.channel('realtime:public:contact_messages:manage')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, (payload) => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages]);

  const handleOpenReplyDialog = (message) => {
    setSelectedMessage(message);
    setReplyText('');
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim() || !user) return;
    setIsReplying(true);

    const { error } = await supabase
      .from('contact_messages')
      .update({ 
        response_message: replyText, 
        responded_by: user.id,
        responded_at: new Date().toISOString() 
      })
      .eq('id', selectedMessage.id);

    if (error) {
      console.error("Error replying to message:", error);
      toast({ title: "Error", description: "No se pudo enviar la respuesta.", variant: "destructive" });
    } else {
      toast({ title: "Respuesta Enviada", description: "El mensaje ha sido respondido." });
      // Record action
      await supabase.from('psychologist_actions').insert({
        psychologist_id: user.id,
        action_type: 'responded_message',
        target_id: selectedMessage.id,
        details: { message_subject: selectedMessage.subject, patient_email: selectedMessage.email }
      });
      fetchMessages();
      setSelectedMessage(null); // Close dialog implicitly by state logic if Dialog open state is tied to selectedMessage
    }
    setIsReplying(false);
  };
  
  const formatDate = (dateStr) => format(parseISO(dateStr), "Pp", { locale: es });

  return (
    <div className="pt-28 pb-16 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestionar Mensajes de Contacto</h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando mensajes...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 py-10 bg-white rounded-lg shadow">No hay mensajes recibidos.</p>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <h2 className="text-xl font-semibold text-primary">{msg.subject}</h2>
                  {msg.responded_at ? (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 mt-2 sm:mt-0">Respondido</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 mt-2 sm:mt-0">Pendiente</Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
                    <p className="flex items-center"><User className="w-4 h-4 mr-2 text-gray-400" /> De: {msg.name}</p>
                    <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-400" /> Email: {msg.email}</p>
                    <p className="flex items-center col-span-full md:col-span-1"><Calendar className="w-4 h-4 mr-2 text-gray-400" /> Recibido: {formatDate(msg.created_at)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="text-gray-700 whitespace-pre-wrap flex items-start">
                        <MessageSquare className="w-5 h-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                        {msg.message}
                    </p>
                </div>

                {msg.response_message && (
                  <div className="ml-6 mt-3 mb-4 p-4 border-l-2 border-blue-300 bg-blue-50 rounded-md">
                    <p className="text-sm font-semibold text-blue-700 mb-1 flex items-center">
                      <CornerDownRight className="w-4 h-4 mr-2" /> Tu Respuesta ({msg.responded_at ? formatDate(msg.responded_at) : ''}):
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.response_message}</p>
                  </div>
                )}

                {!msg.responded_at && (
                  <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => handleOpenReplyDialog(msg)}>
                        <Send className="w-4 h-4 mr-2" /> Responder
                      </Button>
                    </DialogTrigger>
                    {selectedMessage && selectedMessage.id === msg.id && (
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Responder a: {selectedMessage.name}</DialogTitle>
                          <DialogDescription>
                            Asunto: {selectedMessage.subject}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-2">
                           <p className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md"><strong>Mensaje Original:</strong> {selectedMessage.message}</p>
                          <Textarea
                            placeholder="Escribe tu respuesta aquí..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={5}
                            className="w-full"
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" onClick={() => setSelectedMessage(null)}>Cancelar</Button>
                          </DialogClose>
                          <Button onClick={handleReply} disabled={isReplying || !replyText.trim()}>
                            {isReplying ? 'Enviando...' : 'Enviar Respuesta'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageMessagesPage;
