import React from "react";

interface Props {
  previous: string | null;
  next: string | null;
  setEndpoint: (endpoint: string) => void;
}

const Pagination = ({ previous, next, setEndpoint }: Props) => {
  return (
    <div className="mt-8 mb-4 flex items-center justify-between">
      {previous && (
        <div
          onClick={() => {
            setEndpoint(previous);
          }}
          className="flex justify-start cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </p>
            <p>Prev</p>
          </div>
        </div>
      )}
      {next && (
        <div
          onClick={() => {
            setEndpoint(next);
          }}
          className="flex justify-end cursor-pointer"
        >
          <div className="flex items-center justify-end gap-1">
            <p>Next</p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
