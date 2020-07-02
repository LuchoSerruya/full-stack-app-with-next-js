import "reflect-metadata";
import "../styles.css";
import { Fragment } from "react";

export default function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <header>
        <nav>
          <ul className="flex justify-between items-center p-8 bg-blue-100">
            <li>
              <a href="/" className="text-blue-500 no-underline">
                Home
              </a>

              <a href="/about" className="text-blue-500 no-underline p-8">
                About
              </a>
            </li>
            <ul className="flex justify-between items-center space-x-4">
              <li>
                <a
                  href="/post/new"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline no-underline"
                >
                  Add
                </a>
              </li>
            </ul>
          </ul>
        </nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-300 flex justify-center items-center py-4">
        <p>Next.js is so cool!</p>
      </footer>
    </Fragment>
  );
}
