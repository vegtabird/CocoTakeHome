import { IOptionItem } from '../../interface';
import { Header } from '../Header';
import styles from './index.module.scss';
interface Props {
  question: string;
  optionsList: IOptionItem[];
  onClickClose?: () => void;
}
export function Poll(props: Props) {
  const { question, optionsList, onClickClose } = props;
  return (
    <div className={styles.pollModal}>
      <Header
        title="Poll"
        leftText="close"
        onClickLeft={() => {
          onClickClose && onClickClose();
        }}
      />
      <div className={styles.container}>
        <div className={styles.question}>{question}</div>
        {optionsList.map((item) => {
          const { key, voteNumber = 0, text } = item;
          const voteText = voteNumber > 1 ? 'votes' : 'vote';
          return (
            <div key={key} className={styles.optionsItem}>
              <div className={styles.itemText}>{text}</div>
              <div className={styles.vote}>
                {voteNumber > 0 ? voteNumber : 0} {voteText} <img src="/images/Toggle.png" className={styles.img} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
