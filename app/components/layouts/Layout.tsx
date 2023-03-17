/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react';
import { Container } from '@nextui-org/react';
import type { User } from '@supabase/supabase-js';
import { tv } from 'tailwind-variants';
import { useMediaQuery } from '@react-hookz/web';
import { useSoraSettings } from '~/hooks/useLocalStorage';

import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from '~/components/elements/scroll-area/ScrollArea';

/* Components */
import Flex from '../styles/Flex.styles';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import BreadCrumb from './BreadCrumb';
import GlobalPlayer from './GlobalPlayer';

interface ILayout {
  children: React.ReactNode;
  user?: User;
}

const scrollAreaStyles = tv({
  base: 'grow bg-background-contrast-alpha ml-0 !rounded-tl-xl !rounded-r-none !rounded-bl-none overflow-hidden transition-[margin] transition-200',
  variants: {
    mini: {
      true: 'sm:ml-[80px]',
      false: 'sm:ml-[250px]',
    },
  },
  defaultVariants: {
    mini: false,
  },
});

const scrollAreaViewportStyles = tv({
  base: 'flex flex-col justify-center items-center transition-[width,_height] transition-200',
  variants: {
    mini: {
      true: 'sm:max-w-[calc(100vw_-_80px)]',
      false: 'sm:max-w-[calc(100vw_-_250px)]',
    },
  },
  defaultVariants: {
    mini: false,
  },
});

const Layout = (props: ILayout) => {
  const { children, user } = props;
  const [open, setOpen] = useState(false);
  const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
  const { sidebarMiniMode } = useSoraSettings();

  return (
    <div className="flex flex-nowrap justify-start max-w-full max-h-full min-h-screen bg-background">
      {isSm ? null : <SideBar open={open} setOpen={setOpen} />}
      <ScrollArea
        type="always"
        className={scrollAreaStyles({ mini: sidebarMiniMode.value })}
        css={{
          maxWidth: '100%',
          height: '100vh',
        }}
      >
        <ScrollAreaViewport>
          <div className={scrollAreaViewportStyles({ mini: sidebarMiniMode.value })}>
            {/* <Header open={open} user={user} setOpen={setOpen} /> */}
            <Container
              as="main"
              fluid
              responsive
              css={{
                zIndex: 0,
                minHeight: '100vh',
                padding: 0,
                margin: '0 0 200px 0',
                '@xs': {
                  paddingLeft: '20px',
                  paddingRight: '20px',
                },
              }}
            >
              {/* <BreadCrumb /> */}
              <GlobalPlayer />
              {children}
            </Container>
            {/* <Footer /> */}
            {isSm ? <BottomNav /> : null}
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    </div>
  );
};

export default Layout;
