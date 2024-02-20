import { useState, useRef, useEffect } from 'react';

export default function Tooltip({msg, active}:{msg:string|undefined, active: boolean | undefined}) {
  const [topPosition, setTopPosition] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      // 요소의 높이를 가져옴
      const height = tooltipRef.current.clientHeight;
      // 요소의 높이를 기준으로 top 위치 계산
      const top = active ? -height - 10 : -44; // 예를 들어, 높이의 반대 방향으로 10px 이동
      setTopPosition(top);
    }
  }, [msg, active]);

  return (
    <>
      <article ref={tooltipRef} className={`tooltip ${active && 'active'}`} style={{ top: topPosition }}>
        {msg}
      </article>
    </>
  );
}