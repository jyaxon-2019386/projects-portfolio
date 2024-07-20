import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Footer} from '../../components/SideBar/Footer';
import { SideBar } from '../../components/SideBar/SideBar';
import { NavBar } from '../../components/SideBar/NavBar';

export const Dashboard = () => {
  return (
    <div className="w-full">
      <NavBar/>
      <div className="flex-1">
       <SideBar/>
      <section className="bg-primary py-12 md:py-16 lg:py-20">
        
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          
          <div className="max-w-3xl space-y-4 text-center md:text-left">
           
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Consejos para trabajadores bancarios
            </h2>
            <p className="text-primary-foreground/80 md:text-xl">
              Descubre los mejores consejos para mejorar tu desempeño y avanzar en tu carrera en el sector bancario.
            </p>
          </div>
          <img src="https://img.freepik.com/fotos-premium/mujer-joven-senalando-dedo-izquierda-mirando-al-frente-sonrisa-alegre_176420-43787.jpg" alt="Banking Advice" width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AdviceCard
              Icon={BriefcaseIcon}
              title="Desarrolla habilidades técnicas"
              description="Mantente actualizado en las últimas tecnologías y herramientas utilizadas en el sector bancario. Esto te ayudará a ser más eficiente y a destacar en tu trabajo."
            />
            <AdviceCard
              Icon={UsersIcon}
              title="Mejora tus habilidades de comunicación"
              description="Aprende a comunicarte de manera clara y efectiva con tus clientes y compañeros de trabajo. Esto te ayudará a brindar un mejor servicio y a trabajar en equipo de manera más eficiente."
            />
            <AdviceCard
              Icon={ClipboardIcon}
              title="Mantén una actitud proactiva"
              description="Sé proactivo en tu trabajo, anticipando las necesidades de tus clientes y proponiendo soluciones innovadoras. Esto te ayudará a destacar y a avanzar en tu carrera."
            />
            <AdviceCard
              Icon={AwardIcon}
              title="Enfócate en la excelencia en el servicio"
              description="Brinda un excelente servicio a tus clientes, anticipando sus necesidades y superando sus expectativas. Esto te ayudará a construir relaciones sólidas y a destacar en tu trabajo."
            />
            <AdviceCard
              Icon={TrendingUpIcon}
              title="Sé un líder en tu equipo"
              description="Demuestra liderazgo en tu equipo, aportando ideas y soluciones innovadoras. Esto te ayudará a destacar y a avanzar en tu carrera."
            />
            <AdviceCard
              Icon={BriefcaseIcon}
              title="Mantén una actitud positiva"
              description="Enfócate en lo positivo y mantén una actitud optimista, incluso en los momentos difíciles. Esto te ayudará a superar los desafíos y a inspirar a tu equipo."
            />
            <AdviceCard
              Icon={UsersIcon}
              title="Construye relaciones sólidas"
              description="Enfócate en construir relaciones de confianza con tus clientes y compañeros de trabajo. Esto te ayudará a brindar un mejor servicio y a trabajar de manera más eficiente."
            />
            <AdviceCard
              Icon={ClipboardIcon}
              title="Mantén una actitud de aprendizaje continuo"
              description="Siempre estate dispuesto a aprender nuevas habilidades y a mejorar tus conocimientos. Esto te ayudará a mantenerte actualizado y a adaptarte a los cambios en el sector bancario."
            />
            <AdviceCard
              Icon={BriefcaseIcon}
              title="Mantén un balance entre tu vida laboral y personal"
              description="Asegúrate de dedicar tiempo a tu vida personal y a actividades que te permitan relajarte y recargar energías. Esto te ayudará a evitar el burnout y a mantener un mejor desempeño en el trabajo."
            />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <PopoverComponent>
              <button className="w-[240px] justify-start text-left font-normal border border-gray-300 p-2 rounded">
                <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                Ver calendario
              </button>
            </PopoverComponent>
            <div className="bg-card rounded-xl shadow-sm p-6 w-full max-w-md">
              <div className="grid grid-cols-1 gap-4">
                <h3 className="text-xl font-bold text-center">Horario de atención</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">Lunes</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">Martes</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">Miércoles</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">Jueves</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">Viernes</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">Sábado</span>
                    <span className="text-muted-foreground">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       <Footer/>
    </div>
    </div>
   
  );
};

const PopoverComponent = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>{children}</div>
      {open && (
        <div className="absolute z-10 bg-white shadow-lg border border-gray-300 rounded mt-2 p-4">
          <Calendar mode="single" initialFocus />
          <div className="p-4 text-muted-foreground">Recuerda anotar las fechas importantes</div>
        </div>
      )}
    </div>
  );
};

const AdviceCard = ({ Icon, title, description }) => (
  <div className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:scale-105">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative p-6 space-y-4">
      <div className="bg-muted rounded-md p-3 flex items-center justify-center">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export const AwardIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    <circle cx="12" cy="8" r="6" />
  </svg>
);

export const BriefcaseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12h-1v-1a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v1H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2zM7 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3H7V5z" />
  </svg>
);

export const CalendarDaysIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 2v2M8 2v2M4 7h16v13H4V7zm0 13v-6m16 6v-6M4 13h16" />
  </svg>
);

export const ClipboardIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2h12a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 4v4M8 8h8" />
  </svg>
);

export const TrendingUpIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12l4-4 4 4 8-8M4 20h16" />
  </svg>
);

export const UsersIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 6a4 4 0 0 1 8 0 4 4 0 0 1-8 0zM4 12a4 4 0 0 1 4 4v1a4 4 0 0 1-4-4v-1zM14 6a4 4 0 0 1 8 0 4 4 0 0 1-8 0zM14 12a4 4 0 0 1 4 4v1a4 4 0 0 1-4-4v-1z" />
  </svg>
);
