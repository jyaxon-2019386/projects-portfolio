import { useEffect } from "react";
import { NavBar } from "../SideBar/NavBar.jsx";
import { SideBar } from "../SideBar/SideBar.jsx";
import { useGetOffer } from "../../shared/hooks/useGetOffer";
import { ClockLoader, PacmanLoader } from "react-spinners";

export const OffersAdmin = () => {
  const { offers, isFetching, getOffers } = useGetOffer();

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    console.log('Offers:', offers);
  }, [offers]);

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
        <SideBar className="fixed top-16 w-1/4 bg-gray-800 text-white h-full">
        </SideBar>
        <div className="container mx-auto px-4 py-8 ">
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
