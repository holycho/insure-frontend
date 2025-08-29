import React, { useRef } from 'react';
import { ArticleDisplayer00Props } from './types';
import { useField } from 'formik';
import { CheckCircleFilled } from '@ant-design/icons';

const styles: {[key: string]: React.CSSProperties } = {
  unchecked: {
    color: 'rgba(221, 221, 221, 0.5)',
    fontSize: 16,
    marginLeft: 5
  },
  checked: {
    color: '#EF4F4F',
    fontSize: 16,
    marginLeft: 5
  }
};

const ArticleDisplayer00: React.FC<ArticleDisplayer00Props> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [field, , helpers] = useField(props.name);

  /**
   * @description 檢查滾動至文字內容底部
   */
  const checkScrollToBottom = () => {
    if (!contentRef.current) return;
    const contentHeight = contentRef.current.clientHeight;
    const scrollTop = contentRef.current.scrollTop + 1;
    const scrollHeight = contentRef.current.scrollHeight;
    if ((scrollTop >= scrollHeight - contentHeight) && !field.value) {
      helpers.setValue(true);
    }
  };

  return (
    <div className="article-displayer-00">
      <div className="article-displayer-00__title">{props.title}</div>
      <div className="article-displayer-00__read-checker article-displayer-00-read-checker">
        <input type="radio" className="article-displayer-00-read-checker__input" {...field} checked={field.value} />
        <div className="article-displayer-00-read-checker__text">
          請下拉卷軸至內容文末
          <CheckCircleFilled style={field.value ? styles.checked : styles.unchecked} />
        </div>
      </div>
      <div ref={contentRef} className={['article-displayer-00__content', props.contentClassName ?? ''].filter(c => c).join(' ')} onScroll={checkScrollToBottom}>
        {props.children}
      </div>
    </div>
  );
};

export default ArticleDisplayer00;
