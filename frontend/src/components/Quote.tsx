const Quote = () => {
  return (
    <div className=" h-screen bg-slate-100 flex justify-center flex-col   px-8  ">
      <div className="m-10 px-10">
        <div className="text-3xl font-semibold">
          {/* "The customer support I received was exceptional. The support team went
        above and beyond to address my concerns" */}
          "Never memorize something that you can look up."
        </div>
        <div className="text-xl font-semibold  mt-3">
          {/* Julies Winfield */}Albert Einstein
        </div>
        <div className="text-slate-600">
          {/* CEO | Acme corp */}
          Genius
        </div>
      </div>
    </div>
  );
};

export default Quote;
