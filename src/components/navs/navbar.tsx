import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/logo.png';
import AuthModal from './auth-modal';

const Navbar = () => {
  return (
    <div className=' flex py-5 items-center justify-between'>
      <Link href={'/'} className='flex items-center gap-x-2'>
        <Image src={Logo} alt={'logo'} className='size-10' />
        <h4 className='text-2xl font-semibold'>
          Cal <span className='text-primary'>Scheduler</span>
        </h4>
      </Link>

      <AuthModal />
    </div>
  );
};

export default Navbar;
