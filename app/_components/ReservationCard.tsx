import { format, formatDistance, isPast, isToday } from 'date-fns';
import { Bookings } from '@/types/types';
import Image from 'next/image';
import ReservationActions from './ReservationActions';

export const formatDistanceFromNow = (date: Date) =>
  formatDistance(date, new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking }: { booking: Bookings }) {
  const { _id: id,
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    cabinImg,
    cabinName } = booking

  return (
    <div className={`flex flex-col md:flex-row border border-primary-800 ${isPast(startDate) && 'opacity-80 grayscale hover:grayscale-0'}`}>
      <div className='relative h-40 md:h-32 aspect-square'>
        <Image
          src={cabinImg || ""}
          fill
          alt={`Cabin ${cabinName}`}
          className='object-cover border-r border-primary-800'
        />
      </div>

      <div className='flex-grow px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg md:text-xl font-semibold'>
            {numNights} nights in Cabin {cabinName}
          </h3>
          {isPast(startDate) ? (
            <span className='bg-yellow-800 text-yellow-200 h-6 px-2 md:h-7 md:px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-green-800 text-green-200 h-6 px-2 md:h-7 md:px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-sm md:text-lg text-primary-300'>
          {format(startDate, 'EEE, MMM dd yyyy')} (
          {isToday(startDate)
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(endDate, 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex gap-5 mt-auto items-center md:items-baseline'>
          <p className='text-base md:text-xl font-semibold text-accent-400'>${totalPrice}</p>
          <p className='text-primary-300'>&bull;</p>
          <p className='text-sm text-center md:text-xl text-primary-300'>
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className='ml-auto text-xs md:text-sm text-primary-400'>
            Booked {format(createdAt, 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      {!isPast(startDate) ? <ReservationActions id={id} startDate={startDate} /> : null}



    </div>
  );
}

export default ReservationCard;
