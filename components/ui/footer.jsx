import CosmosBackground from "../custom/CosmosBackground";

const Footer = () => {
  return (<>
    <footer className="w-full border-t-2 border-gray-800 font-lato bg-black">

      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto lg:px-12 gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <a href="https://pagedone.io/" className="flex justify-center text-4xl text-pink-600 lg:justify-start">
            Freelancer
            </a>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">Trusted in more than 100 countries & 5 million customers. Have any query ?</p>
            <a href="javascript:;" className="py-2.5 px-5 h-9 block w-fit bg-pink-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all  duration-500 hover:bg-pink-700 lg:mx-0">
              Contact us
            </a>
          </div>

          <div className=" lg:mx-auto text-center ">
            <h4 className="text-lg text-pink-600 font-medium mb-7">Pagedone</h4>
            <ul className="text-sm text-gray-200 child:hover:text-pink-500 transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className=" ">Home</a></li>
              <li className="mb-6"><a href="javascript:;" className=" ">About</a></li>
              <li className="mb-6"><a href="javascript:;" className="  ">Pricing</a></li>
              <li><a href="javascript:;" className=" ">Features</a></li>
            </ul>
          </div>

          <div className=" lg:mx-auto text-center ">
            <h4 className="text-lg  text-pink-600 font-medium mb-7">Products</h4>
            <ul className="text-sm text-gray-200  transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className=" ">Figma UI System</a></li>
              <li className="mb-6"><a href="javascript:;" className="  ">Icons Assets</a></li>
              <li className="mb-6"><a href="javascript:;" className="  ">Responsive Blocks</a></li>
              <li><a href="javascript:;" className="  ">Components Library</a></li>
            </ul>
          </div>

          <div className="lg:mx-auto text-center">
            <h4 className="text-lg text-pink-600 font-medium mb-7">Resources</h4>
            <ul className="text-sm text-gray-200  transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className=" ">FAQs</a></li>
              <li className="mb-6"><a href="javascript:;" className="  ">Quick Start</a></li>
              <li className="mb-6"><a href="javascript:;" className="  ">Documentation</a></li>
              <li><a href="javascript:;" className="  ">User Guide</a></li>
            </ul>
          </div>

          <div className=" lg:mx-auto text-center">
            <h4 className="text-lg text-pink-600 font-medium mb-7">Blogs</h4>
            <ul className="text-sm text-gray-200  transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className=" ">News</a></li>
              <li className="mb-6"><a href="javascript:;" className="  ">Tips & Tricks</a></li>
              <li className="mb-6"><a href="javascript:;" className="  ">New Updates</a></li>
              <li><a href="javascript:;" className="  ">Events</a></li>
            </ul>
          </div>
        </div>
        <div className="py-7 border-t border-gray-500">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 ">©<a href="https://pagedone.io/">pagedone</a> 2024, All rights reserved.</span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <a href="javascript:;" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g id="Social Media">
                    <path id="Vector" d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z" fill="white" />
                  </g>
                </svg>
              </a>
              <a href="javascript:;" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">

              </a>
              <a href="javascript:;" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">


              </a>
              <a href="javascript:;" className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600">

              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>)
}

export default Footer;