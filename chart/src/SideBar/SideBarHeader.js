import React from 'react'

function SideBarHeader({coin}) {
  return (
    <div class='h-screen w-full'>
    <span class='text-white text-lg font-open m-2'>
      {coin}
    </span>
    </div>
  )
}

export default SideBarHeader