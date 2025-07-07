
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, UserCircle, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const baseNavLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Psicólogos', path: '/psicologos' },
    { name: 'Citas', path: '/citas' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const psychologistNavLinks = userProfile?.role === 'psychologist' ? [
    { name: 'Dashboard', path: '/dashboard-psicologo'},
    { name: 'Gestionar Citas', path: '/dashboard-psicologo/citas' },
    { name: 'Mensajes', path: '/dashboard-psicologo/mensajes' },
    { name: 'Mi Actividad', path: '/dashboard-psicologo/actividad' },
  ] : [];

  const navLinks = [...baseNavLinks, ...psychologistNavLinks];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Clinica de Especialidades Psicologicas
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {baseNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <UserCircle size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userProfile?.full_name || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userProfile?.role === 'psychologist' ? 'Psicólogo/a' : 'Paciente'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userProfile?.role === 'psychologist' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard-psicologo" className="flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link to="/dashboard-psicologo/citas" className="flex items-center">
                           Gestionar Citas
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link to="/dashboard-psicologo/mensajes" className="flex items-center">
                           Mensajes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard-psicologo/actividad" className="flex items-center">
                           Mi Actividad
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Crear Cuenta</Link>
                </Button>
              </div>
            )}
             <button
              className="md:hidden text-gray-700 hover:text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                      location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <DropdownMenuSeparator />
                {!user && (
                  <>
                    <Button variant="outline" asChild className="w-full mt-2">
                      <Link to="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild className="w-full mt-2">
                      <Link to="/signup">Crear Cuenta</Link>
                    </Button>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
