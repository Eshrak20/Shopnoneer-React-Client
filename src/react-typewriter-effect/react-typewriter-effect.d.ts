declare module 'react-typewriter-effect' {
    import { ComponentType } from 'react';
  
    interface TypewriterEffectProps {
      options: {
        strings: string[];
        autoStart?: boolean;
        loop?: boolean;
        delay?: number;
        deleteSpeed?: number;
        cursor?: string;
      };
    }
  
    const TypewriterEffect: ComponentType<TypewriterEffectProps>;
    export default TypewriterEffect;
  }
  