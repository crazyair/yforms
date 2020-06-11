import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export interface YFormSecureButtonProps {
  componentProps?: ButtonProps & { onLoaded?: () => void };
}

const SecureButton: React.FC<YFormSecureButtonProps['componentProps']> = (props) => {
  const { onClick, onLoaded, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const timeOut = useRef<number | null>(null);

  useEffect(() => {
    return () => clearTimeout(timeOut.current);
  }, []);

  const handleSetFalseLoading = useCallback(
    (end: number, begin: number, err?: any) => {
      if (err) {
        setLoading(false);
      } else if (end - begin > 500) {
        // 如果 onClick 执行时间大于 0.5s，就立刻取消 loading
        setLoading(false);
        if (onLoaded) onLoaded();
      } else {
        // 如果 onClick 执行时间小于 0.5s，就设置 0.5s 后再取消 loading
        timeOut.current = window.setTimeout(() => {
          setLoading(false);
          if (onLoaded) onLoaded();
        }, 500);
      }
    },
    [onLoaded],
  );

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      setLoading(true);
      const begin = new Date().getTime();
      try {
        await onClick(e);
        const end = new Date().getTime();
        handleSetFalseLoading(end, begin);
      } catch (e) {
        const end = new Date().getTime();
        handleSetFalseLoading(end, begin, e || 'secure-button click error');
      }
    }
  };

  return <Button onClick={handleClick} loading={loading} {...rest} />;
};

export default SecureButton;
