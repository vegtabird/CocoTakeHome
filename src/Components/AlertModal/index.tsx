/* eslint-disable react-refresh/only-export-components */
import { createPortal } from 'react-dom';
interface Props {
  visible: boolean;
  children: unknown;
}
import styles from './index.module.scss';
import { ReactNode, useEffect, useState } from 'react';
function ModalContent(props: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const { visible, children } = props;
  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);
  return visible ? <div className={`${styles.modal} ${modalVisible ? styles.visible : ''}`}>{children as ReactNode}</div> : null;
}

export function Modal(props: Props) {
  return createPortal(<ModalContent {...props} />, document.getElementById('modal')!);
}
