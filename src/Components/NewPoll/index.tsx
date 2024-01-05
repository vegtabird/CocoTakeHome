import { useState } from 'react';
import { Header } from '../Header';
import { Toggle } from '../Toggle';
import { Modal } from '../AlertModal';
import { Poll } from '../Poll';
import { IOptionItem } from '../../interface';
import { SortableList } from '../DragList';
import { useQuestionLimited, checkNewPollValidate } from './hooks';
import styles from './index.module.scss';
export function NewPollModal() {
  const [question, setQuestion] = useState('');
  const [optionsList, setOptionsList] = useState<IOptionItem[]>([
    {
      key: 0,
      text: '',
    },
  ]);
  // for poll modal data
  const [pollModalData, setPollModalData] = useState<{
    question: string;
    optionsList: IOptionItem[];
  }>({
    question: '',
    optionsList: [],
  });
  const [pollModalShow, setPollModalShow] = useState(false);
  const maxOptionsLength = 10;
  const maxQuestionLength = 255;
  const questionHint = useQuestionLimited(question, maxQuestionLength);
  function clickAddBtn() {
    const newOptionsList = [
      ...optionsList,
      {
        key: optionsList.length,
        text: '',
      },
    ];
    setOptionsList(newOptionsList.slice(0, maxQuestionLength));
  }
  const isOptionNotExeccd = optionsList.length < maxOptionsLength;
  return (
    <div className={styles.pollModal}>
      <Header
        title="New Poll"
        rightText="Send"
        leftText="Cancel"
        onClickRight={() => {
          const { isValidate, errorMessage, validOption } = checkNewPollValidate(question, optionsList, maxQuestionLength);
          if (isValidate) {
            //show poll modal
            setPollModalShow(true);
            setPollModalData({
              question,
              optionsList: validOption || [],
            });
          } else {
            alert(errorMessage);
          }
        }}
      />
      <div className={styles.container}>
        <div className={styles.question}>
          <div className={styles.questionLable}>
            <div className={styles.label}>Question</div>
            {questionHint && <div className={styles.hint}> {questionHint}</div>}
          </div>
          <input
            placeholder="Ask a question"
            className={styles.input}
            autoFocus={false}
            value={question}
            onChange={(ev) => {
              setQuestion(ev.target.value);
            }}
          />
        </div>
        <div className={styles.options}>
          <div className={styles.label}>Options</div>
          <div className={styles.optionsList}>
            <SortableList
              setData={setOptionsList}
              itemClass={styles.optionItem}
              data={optionsList}
              renderItem={(item, index) => {
                return (
                  <>
                    <input
                      maxLength={100}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const newOptionsList = optionsList.map((item, _i) => {
                          if (_i === index) {
                            return {
                              ...item,
                              text: value,
                            };
                          }
                          return item;
                        });
                        setOptionsList(newOptionsList);
                      }}
                      placeholder="Option"
                      className={styles.input}
                      value={item.text}
                      key={item.key}
                      unselectable="on"
                    />
                    <img src="/images/Vector.png" className={styles.vector} alt="vector" title="vector" />
                  </>
                );
              }}
              separator={(item, _i) => {
                if (_i !== optionsList.length - 1) {
                  return <div className={styles.separator} />;
                }
              }}
            />
            {isOptionNotExeccd && (
              <div className={styles.addButton} onClick={clickAddBtn}>
                Add option
              </div>
            )}
          </div>
          {isOptionNotExeccd && <div className={styles.optionHint}>you can add {maxOptionsLength - optionsList.length} more options</div>}
        </div>
        <div className={styles.switch}>
          <div>Multiple answers</div>
          <Toggle />
        </div>
      </div>
      <Modal visible={pollModalShow}>
        <Poll
          question={pollModalData.question}
          optionsList={pollModalData.optionsList}
          onClickClose={() => {
            setPollModalShow(false);
          }}
        />
      </Modal>
    </div>
  );
}
