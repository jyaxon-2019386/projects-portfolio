

export const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                <svg xmlns="" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                 <img src="" alt="" />
                </svg>
                <span className="ml-3 text-xl">Investment Center</span>
              </a>
              <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
                © 2020 Investment Center —
                <a href="" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@investmentcenter</a>
              </p>
              <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                {/* Social icons */}
              </span>
            </div>
          </footer>
  )
}
export default Footer;