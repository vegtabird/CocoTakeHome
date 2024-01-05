import { useRef, useEffect, ReactNode, useState, Fragment } from 'react';
interface ItemProps {
  children: unknown;
  className?: string;
  index: number;
  listLength: number;
  onItemMove: (preIndex: number, nextIndex: number) => void;
}
function Item({ children, className, index, listLength, onItemMove }: ItemProps) {
  const [top, setTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  const indexRef = useRef(index);
  const clickRef = useRef(false);
  const listLengthRef = useRef(listLength);
  const elRef = useRef<HTMLDivElement>(null);
  const dataMoveRef = useRef(onItemMove);
  useEffect(() => {
    indexRef.current = index;
    listLengthRef.current = listLength;
    dataMoveRef.current = onItemMove;
  }, [index, listLength, onItemMove]);

  useEffect(() => {
    const el = elRef.current;

    // 存储起始鼠标位置
    let startY = 0;

    const touchMove = (ev: TouchEvent) => {
      // get the new top
      const touch = ev.touches[0];
      let latestTop = touch.clientY - startY;
      const rect = el!.getBoundingClientRect();
      if (rect) {
        //move to next
        if (latestTop > rect.height && indexRef.current < listLengthRef.current - 1) {
          dataMoveRef.current(indexRef.current, indexRef.current + 1);
          latestTop -= rect.height;
          startY += rect.height;
        } else if (latestTop < -rect.height && indexRef.current > 0) {
          //move to prev
          dataMoveRef.current(indexRef.current, indexRef.current - 1);
          latestTop += rect.height;
          startY -= rect.height;
        }
      }
      setTop(latestTop);
    };

    const touchUp = () => {
      document.removeEventListener('touchmove', touchMove);
      //set is not click
      clickRef.current = false;
      setTop(0);
      setIsDragging(false);
      setZIndex(0);
    };

    const touchDown = (ev: TouchEvent) => {
      //touch start
      clickRef.current = true;
      setTimeout(() => {
        //mock long click
        if (clickRef.current) {
          // after 500ms user still touch then add the move listener
          document.addEventListener('touchmove', touchMove);
          // start drag
          setIsDragging(true);
          setZIndex(999);
        }
      }, 500);
      document.addEventListener('touchend', touchUp, { once: true });
      // record start postion
      const touch = ev.touches[0];
      startY = touch.clientY;
    };
    el!.addEventListener('touchstart', touchDown);
    return ()=>{
        document.removeEventListener('touchend', touchDown);
        document.removeEventListener('touchmove', touchMove)
    }
  }, []);
  return (
    <>
      <div
        ref={elRef}
        className={className || ''}
        style={{
          //zoom out when is drag
          transform: isDragging ? `scale(1.01)` : `scale(1)`,
          top: `${top}px`,
          transition: 'transform .2s, box-shadow .2s',
          position: 'relative',
          width: '100%',
          boxShadow: isDragging ? '0 0 10px 2px rgba(0, 0, 0, 0.5)' : '0 0 0 0px rgba(0, 0, 0, 0.5)',
          zIndex: zIndex.toString(),
        }}
      >
        {children as ReactNode}
      </div>
    </>
  );
}
interface SortableProps<T> {
  data: T[];
  renderItem: (data: T, index: number) => ReactNode; //render each item
  itemClass?: string; //custom each item container style
  separator?: (item: T, index: number) => ReactNode; //render the separtor
  setData: (data: T[]) => void; //update the data source
}
//simple drag able to change sort list
export function SortableList<T extends { key: string | number }>(props: SortableProps<T>) {
  const { data, renderItem, itemClass, separator, setData } = props;
  return (
    <>
      {data.map((item, i) => (
        //must have a unique key so that change sort will not remount the same item
        <Fragment key={item.key}>
          <Item
            className={itemClass}
            index={i}
            listLength={data.length}
            onItemMove={(prevIndex, nextIndex) => {
              const newData = [...data];
              //move the item from preindex to the next index
              newData.splice(nextIndex, 0, newData.splice(prevIndex, 1)[0]);
              setData(newData);
            }}
          >
            {renderItem(item, i)}
          </Item>
          {separator && separator(item, i)}
        </Fragment>
      ))}
    </>
  );
}
