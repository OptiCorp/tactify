import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const navLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Comunity Page',
    path: '/comunity-page',
  },
  {
    name: 'Create Comp',
    path: '/create-comp-page',
  },
];

function MobileModal({
  setShowMobileModal,
}: {
  setShowMobileModal: (value: boolean) => void;
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.target !== modalRef.current) {
        setShowMobileModal(false);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return (
    <div
      ref={modalRef}
      className="absolute right-5 top-16 z-50 rounded border-4 border-gray-700 md:hidden"
    >
      {navLinks.map((link, idx) => (
        <ul key={link.name}>
          <li>
            <Link
              href={link.path}
              className="block bg-white py-2 pl-3 pr-4 text-black  "
              aria-current="page"
            >
              {link.name}
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

function Navbar() {
  const [showMobileModal, setShowMobileModal] = useState(false);

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href={'/'} legacyBehavior>
          <a className="flex items-center">
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              TACTIFY
            </span>
          </a>
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMobileModal((prevState) => !prevState);
          }}
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
        </button>
        {navLinks.map((link, idx) => (
          <div
            key={idx}
            className="hidden w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <Link
                  href={link.path}
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
                >
                  {link.name}
                </Link>
              </li>

              {/* <li>
                  <Link href={"/comunity-page"} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Comunity Page</Link>
                </li>
                <li>
                  <Link href={"/create-comp-page"} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create Comp</Link>
                </li> */}
            </ul>
          </div>
        ))}
        {showMobileModal ? (
          <MobileModal setShowMobileModal={setShowMobileModal} />
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
