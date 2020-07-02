type Props = {
  previousPage: string;
  nextPage: string;
};

type PaginationButtonProps = {
  page: string;
};

const PreviousPageButton: React.FC<PaginationButtonProps> = ({ page }) => {
  return (
    <a href={`?page=${page}`}>
      <button className="border border-teal-500 text-teal-500 block rounded font-bold pl-4 pr-2 py-4 flex items-center">
        <svg
          className="h-5 w-5 mr-2 fill-current"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="-49 141 512 512"
        >
          <path
            id="XMLID_10_"
            d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"
          ></path>
        </svg>
        <span className="hidden md:block">Previous page</span>
      </button>
    </a>
  );
};

const NextPageButton: React.FC<PaginationButtonProps> = ({ page }) => {
  return (
    <a href={`?page=${page}`}>
      <button className="border border-teal-500 bg-teal-500 text-white block rounded font-bold pl-2 pr-4 py-4 ml-2 flex items-center">
        <span className="hidden md:block">Next page</span>
        <svg
          className="h-5 w-5 ml-2 fill-current"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="-49 141 512 512"
        >
          <path
            id="XMLID_11_"
            d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
                l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
                c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"
          />
        </svg>
      </button>
    </a>
  );
};

export const Pagination: React.FC<Props> = ({ previousPage, nextPage }) => {
  const previousPageButton = previousPage
    ? PreviousPageButton({ page: previousPage })
    : null;
  const nextPageButton = nextPage ? NextPageButton({ page: nextPage }) : null;
  return (
    <section className="flex justify-end m-4">
      {previousPageButton}
      {nextPageButton}
    </section>
  );
};
