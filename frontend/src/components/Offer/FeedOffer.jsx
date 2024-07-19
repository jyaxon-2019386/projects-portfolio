import { useEffect } from "react"
import { useGetOffer } from "../../shared/hooks/useGetOffer"
import {Routes, Route} from 'react-router-dom'
import { Offers } from "./Offers"
import { OfferForm } from "./OfferForm"
import {PacmanLoader} from 'react-spinners'
import { OffersAdmin } from "./OffersAdmin"

export const FeedOffer = () => {

  const {offers, getOffers, isFetching} = useGetOffer()

  useEffect(() => {
    getOffers()
  }, [])

  if(isFetching){
    return(
      <div>
        <PacmanLoader />
      </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path="offersAdmin" element={<OffersAdmin />}/> 
        <Route path="offers" element={<Offers offers={offers} />} />
        <Route path="save" element={<OfferForm />} />
      </Routes>
    </div>
  )
}
