function Skeleton({ amount = 4, type = 'list' }: { amount?: number, type?: string }) {
  return <>
    {type === 'list' ? <div className="animate-pulse">
      <h3 className='h-5 text-primary-300 rounded-2xl mb-4 bg-gray-600 w-4/12 '></h3>
      <p className='h-4 text-primary-300 rounded-2xl bg-gray-600 w-7/12 mb-10'></p>
      <ul className="mb-2">
        {Array.from({ length: amount }).map((e, i) => {
          return <div key={i} className='flex border border-primary-800 rounded-md'>
            <div className='relative h-32 aspect-square bg-gray-600'></div>
            <div className='flex-grow px-6 py-3 flex flex-col'>
              <div className='flex items-center justify-between'>
                <h3 className='h-4 text-primary-300 rounded-2xl bg-gray-600 w-4/12 '></h3>
                <p className='h-7 text-primary-300 rounded-sm bg-gray-600 w-12 '></p>
              </div>

              <p className='h-3 text-primary-300 rounded-2xl bg-gray-600 w-6/12 '></p>

              <div className='flex gap-5 mt-auto items-center'>
                <p className='h-3 text-primary-300 rounded-2xl bg-gray-600 w-14 '></p>
                <span className='size-1 rounded-full bg-gray-600 '></span>
                <p className='h-3 text-primary-300 rounded-2xl bg-gray-600 w-14 '></p>
                <p className='ml-auto h-3 text-primary-300 rounded-2xl bg-gray-600 w-3/12 '></p>
              </div>
            </div>
          </div>
        })}
      </ul>
    </div> : type === 'card' ? <div className="animate-pulse">
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {Array.from({ length: amount }).map((e, i) => {
          return <div key={i} className="flex border-primary-800 border">
            <div className="relative flex-1">
              <div className='size-full bg-gray-600'></div>

            </div>

            <div className="flex-grow">
              <div className="pt-5 pb-4 px-7 bg-primary-950">
                <h3 className="h-5 text-primary-300 rounded-2xl bg-gray-600 mb-2 w-4/12">
                </h3>

                <div className="flex gap-3 items-center mb-2">
                  <p className="size-4 rounded-2xl bg-gray-600"></p>
                  <p className="h-4 rounded-2xl bg-gray-600 w-7/12">

                  </p>
                </div>

                <p className="flex gap-3 justify-end items-baseline">
                  <span className="h-5 m-2 text-primary-300 rounded-2xl bg-gray-600 mb-2 w-4/12">
                  </span>
                  <span className="h-5 text-primary-300 rounded-2xl bg-gray-600  w-2/12">
                  </span>
                  <span className="h-5 text-primary-300 rounded-2xl bg-gray-600  w-2/12"></span>
                </p>
              </div>

              <div className="h-10 bg-primary-950 border-t border-t-primary-800 flex justify-end items-center ">
                <span className="bg-primary-800 h-full w-0.5" />
                <span className="h-4 w-36 rounded-2xl bg-gray-600 mr-6 ml-10" />
              </div>
            </div>
          </div>
        })}
      </ul>
    </div> :
      <div className='animate-pulse relative h-full w-40 bg-gray-600'></div>
    }
  </>


}

export default Skeleton;

