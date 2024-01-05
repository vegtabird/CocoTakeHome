import styles from './index.module.scss';
interface Props {
  title: string;
  leftText?: string;
  rightText?: string;
  onClickRight?: () => void;
  onClickLeft?: () => void;
}
function Header(props: Props) {
  const { title, leftText, rightText, onClickLeft, onClickRight } = props;
  return (
    <div className={styles.header}>
      {!!leftText && (
        <div className={`${styles.cornerBtn} ${styles.left}`} onClick={onClickLeft}>
          {leftText || ''}
        </div>
      )}
      <div className={styles.title}>{title}</div>
      {!!rightText && (
        <div className={`${styles.cornerBtn} ${styles.right}`} onClick={onClickRight}>
          {rightText || ''}
        </div>
      )}
    </div>
  );
}
export { Header };
