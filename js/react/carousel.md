# 幻燈片輪播效果

## 1
此為 React 組件，包含 Tailwindcss v3。 
```js
import { useState } from "react";
import PropTypes from "prop-types";

Carousel.propTypes = {
  childs: PropTypes.array.isRequired
}
export function Carousel({ childs }) {
  const MAX_VISIBILITY = 3;
  const [active, setActive] = useState(2);
  const count = childs.length;
  const move = step => {
    let next = active + step;
    if (next >= count) {
      next = 0;
    } else if (next < 0) {
      next = count - 1;
    }
    setActive(next);
  };
  return (
    <div className="relative w-96 h-96 [perspective:500px] [transform-style:preserve-3d]">
      {childs.map((child, i) => (
        <div className={`absolute inset-0 w-full h-5/6 ${active === i ? 'pointer-events-auto' : 'pointer-events-none'} ${Math.abs(active - i) >= MAX_VISIBILITY ? 'opacity-0' : 'opacity-100'} ${Math.abs(active - i) > MAX_VISIBILITY ? 'hidden' : 'block'}`} style={{
          transform: 'rotateY(calc(var(--offset) * 50deg)) scaleY(calc(1 + var(--abs-offset) * -0.4)) translateZ(calc(var(--abs-offset) * -30rem)) translateX(calc(var(--offset) / var(--abs-offset) * -5rem))',
          filter: 'blur(calc(var(--abs-offset) * 1rem))',
          transition: 'all .3s ease-out',
          '--active': i,
          '--offset': (active - i) / 3,
          '--abs-offset': Math.abs(active - i) / 3
        }} key={i}>
          <div className="p-8 rounded-2xl text-[#9CA3AF] text-justify"
            style={{
              backgroundColor: 'hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%))',
              transition: 'all .3s ease-out'
            }}>
            <h2>{child.title}</h2>
            <p>{child.content}</p>
          </div>
        </div>
      ))}
      <div className="absolute flex items-end justify-center inset-0">
        {/* left button */}
        <button className="px-4 py-2" onClick={() => move(-1)}>left</button>
        {/* right button */}
        <button className="px-4 py-2" onClick={() => move(1)}>right</button>
      </div>
    </div>
  )
}
```
引入方法：
```js
const childs = [
        { title: 'Hello World', content: '111 Lorem ipsum dolor sit amet.' },
        { title: 'Hello World', content: '222 Lorem ipsum dolor sit amet.' },
        { title: 'Hello World', content: '333 Lorem ipsum dolor sit amet.' },
        { title: 'Hello World', content: '444 Lorem ipsum dolor sit amet.' },
        { title: 'Hello World', content: '555 Lorem ipsum dolor sit amet.' },
    ]
return (

<div className="py-6 min-h-[600px] w-full bg-slate-50 flex justify-center items-center overflow-hidden">
            <Carousel childs={childs} />
</div>

)
```
建議按情況彈性調整高寬，以及左右按鈕的設計。