import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

const ListingItem = ({ listing }) => {
    return (
        <div className='bg-white shandow-md hover:shadow-lg transition-shandow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0] || 'https://cdn.prod.website-files.com/620ec747459e13c7cf12a39e/625b10a58137b364b18df2ea_iStock-94179607.jpg'} alt='listing cover'
                    className='h-[320px] sm:h-[220px] w-full object-cover
                    hover:scale-105 transition-scale duration-300'
                />
                <div className='p-3 flex flex-col gap-2'>
                    <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                    <p className='text-slate-500 mt-2 font-semibold flex items-center'>
                        $
                        {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <div className='flex gap-4 text-slate-700'>
                        <div className='font-bold text-sm'>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                        </div>
                        <div className='font-bold text-sm'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ListingItem
