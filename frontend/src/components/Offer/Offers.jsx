import { useEffect } from "react";
import { NavBar } from "../SideBar/NavBar.jsx";
import { SideBarClient } from "../SideBarClient/SideBarClient.jsx";
import { useGetOffer } from "../../shared/hooks/useGetOffer";
import { ClockLoader, PacmanLoader } from "react-spinners";
import { useRecogerOffer } from "../../shared/hooks/useRecogerOffer.jsx"; 
import toast from 'react-hot-toast';

export const Offers = ({ userId }) => {
  const { offers, isFetching, getOffers } = useGetOffer();
  const { recogerOffer, isLoading } = useRecogerOffer();

  useEffect(() => {
    getOffers();
  }, []);

  const handleRecogerOffer = async (offerId) => {
    try {
      await recogerOffer(offerId, userId);
      getOffers();
      //toast.success('Oferta recogida correctamente');
    } catch (error) {
      console.error('Error al recoger la oferta:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error al recoger la oferta');
      }
    }
  };

  if (isFetching) {
    return (
      <div>
        <ClockLoader/>
      </div>
    )
  }

  if (!offers) {
    return(
      <div>
        <PacmanLoader/>
      </div>
    )
  }

  return (
    <div className="bg-[#ffffff] min-h-screen">
      <NavBar className="fixed w-full top-0 bg-gray-700 text-white z-10">
      </NavBar>
      <div className="flex h-screen bg-white">
        <SideBarClient className="fixed top-16 w-1/4 bg-gray-800 text-white h-full">
        </SideBarClient>
        <div className="container pt-8 mx-auto px-4 py-8  justify-center ">
          <div className="flex flex-wrap -mx-4 justify-center pt-8 ">
            {offers.map((offer, index) => (
              <div key={index} className="max-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg relative mx-4 my-4 w-full md:w-2/2 lg:w-1/4">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${offer.imageUrl})` }} title={offer.name}></div>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-xl mb-2">{offer.name}</div>
                  </div>
                  <p className="text-gray-700 text-base mt-2">Tiene un costo total Q{offer.price}</p>
                  <p className="text-gray-700 text-base mt-2">En un {offer.percentage}% de descuento</p>
                  <br/>
                  <div className="content-center relative mt-2 rounded-md shadow-sm flex justify-center">
                    <button 
                      className='justify-center items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                      onClick={() => handleRecogerOffer(offer._id)}>
                      {isLoading ? <div className="spinner-border spinner-border-sm" role="status"></div> : 'Recoger'}
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-4">
                    {offer.tags && offer.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>  
        </div>
      </div>
    </div>
  );
};