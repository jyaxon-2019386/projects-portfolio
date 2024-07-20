
import { SideBarClient } from '../../components/SideBarClient/SideBarClient.jsx';
import { NavBar } from '../../components/SideBar/NavBar';
import { Footer } from '../../components/SideBar/Footer';
import Image from '../../assets/2.png';

export const DashboardUser = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBarClient />
       
        <div className="flex-1 overflow-y-auto bg-gray-900">
          {/*Se realizan seccionen y se deja comentario sobre cada una.*/ }
          <section className="text-gray-400 body-font">
            <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  Somos <br className="hidden lg:inline-block"/>Investment Center
                </h1>
                <p className="mb-6 leading-relaxed">
                  La seguridad de tu dinero es nuestra máxima prioridad. Utilizamos tecnologías de seguridad avanzadas para proteger tus fondos y garantizar transacciones seguras y privadas.
                </p>
                <div className="flex justify-center">
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="object-cover object-center rounded" alt="hero" src="https://bcomedigital.com/wp-content/uploads/bancos-de-imagenes.jpg" />
              </div>
            </div>
          </section>
          {/*Se Seccion imagen y */} 
          <section className="text-gray-400 body-font mb-40">
            <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                <img className="object-cover object-center rounded" alt="hero" src={Image}/>
              </div>
              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Innovative Solutions</h1>
                <p className="mb-8 leading-relaxed">Discover the cutting-edge technologies and innovative solutions we provide at Investment Center to keep your investments secure.</p>
                <div className="flex justify-center">
                  <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Explore</button>
                </div>
              </div>
            </div>
          </section>
          <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                  <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
                    <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">1</div>
                    <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-indigo-400 rounded-full inline-flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                        <h2 className="font-medium title-font text-white mb-1 text-xl">Protegeremos tus Datos</h2>
                        <p className="leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem error enim quod ea quaerat eligendi neque veritatis inventore, facilis, corporis praesentium totam ipsum aspernatur nisi provident dolorum voluptatem? Necessitatibus, adipisci!</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
                    <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">2</div>
                    <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-indigo-400 rounded-full inline-flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                        <h2 className="font-medium title-font text-white mb-1 text-xl">Nos importa tu Salud</h2>
                        <p className="leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, accusantium illum aliquam quidem est ab? Illum, sed totam commodi blanditiis perferendis optio culpa quam vero maiores aperiam, aliquam repellendus inventore?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
                    <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">3</div>
                    <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-indigo-400 rounded-full inline-flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="3"></circle>
                          <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                        </svg>
                      </div>
                      <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                        <h2 className="font-medium title-font text-white mb-1 text-xl">Recuerda tener cuidado con el Pishing</h2>
                        <p className="leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis animi dignissimos laudantium ducimus, eligendi temporibus incidunt corporis ut doloremque aperiam corrupti ea, quos quisquam? Expedita iure exercitationem animi ducimus earum!.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
                    <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">4</div>
                    <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-indigo-400 rounded-full inline-flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                        <h2 className="font-medium title-font text-white mb-1 text-xl">Interfaz fácil de utilizar</h2>
                        <p className="leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque officiis non voluptas quia adipisci doloribus voluptates tempore, facilis laudantium autem laborum saepe id quam quae minus maxime atque nam obcaecati..</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

          <section className="text-gray-400 bg-gray-900 body-font mt-40">
                <div className="container px-2 py-50 mx-auto flex flex-wrap">
                  <div className="flex w-full mb-20 flex-wrap">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-white lg:w-1/3 lg:mb-0 mb-2">Master Cleanse Reliac Heirloom</h1>
                    <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro error hic temporibus, natus odio nostrum eligendi, consequatur voluptas cum tempora, ipsum magnam sint molestias illum impedit quod sit reprehenderit numquam!</p>
                  </div>
                  <div className="flex flex-wrap md:-m-2 -m-1">
                    <div className="flex flex-wrap w-1/2">
                      <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://img.freepik.com/foto-gratis/crisis-economica-global-covid-19_23-2148746544.jpg?t=st=1717436760~exp=1717440360~hmac=93f345d51e1337d824c621925002c4c091b4752f73a88ebfbb900add291a2100&w=740"/>
                      </div>
                      <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://img.freepik.com/foto-gratis/disparo-angulo-edificios-altos-cielo-despejado-frankfurt-alemania_181624-30909.jpg?t=st=1717436776~exp=1717440376~hmac=a45b5150a639f5bb1166c2d5aafb72967767d4416f6bb66ee2a4bbc6fb7272ef&w=1380"/>
                      </div>
                      <div className="md:p-2 p-1 w-full">
                        <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://img.freepik.com/foto-gratis/disparo-alto-angulo-hermoso-paisaje-urbano-al-atardecer-ciudad-nueva-york-ee_181624-42898.jpg?t=st=1717436791~exp=1717440391~hmac=298755803538e7bb01f4d7da4929b08391f824001fa4816dcd4e18bbcb986cff&w=1480"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap w-1/2">
                      <div className="md:p-2 p-1 w-full">
                        <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://img.freepik.com/foto-gratis/pago-tarjeta-credito-compra-venta-productos-servicios_1150-16379.jpg?t=st=1717436808~exp=1717440408~hmac=43943b5604ebebd3ff569991410251f8f96c2c8ec5f0be83ab69e77fdc2ba7ea&w=1380"/>
                      </div>
                      <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://img.freepik.com/foto-gratis/transferencia-bancaria-joven-usando-su-telefono-inteligente-computadora-portatil-hacer-transaccion-bancaria-algunos-pagos_662251-2046.jpg?t=st=1717436828~exp=1717440428~hmac=c8d234617f7f6c8ce206fcf5eac1dbed9349cdafb1946763e03bf8c38ba99809&w=1380"/>
                      </div>
                      <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://img.freepik.com/foto-gratis/vista-trasera-hombre-adulto-que-busca-nuevo-trabajo-trabaja-escribir-su-curriculum-computadora-portatil_662251-2153.jpg?t=st=1717436842~exp=1717440442~hmac=bc6bf592b503dac99188354e0155665b3259c1eb47dc57ca64af7cdc6c69e575&w=1380  "/>
                      </div>
                    </div>
                  </div>
                </div>
              </section>      
              <Footer />    
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
