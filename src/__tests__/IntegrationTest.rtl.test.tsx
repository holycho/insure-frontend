import { act } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { renderWithRedux } from './test-redux-utils';
import Header from 'app/common/layouts/Header';
import headerData from '../mocks/json/header.json';
import Footer from 'app/common/layouts/Footer';
import { initialHeaderAndFooterDoneAction } from 'app/store/layout/actions';

// jest.mock('jquery', () => {
//   const m$ = {
//     on: jest.fn(),
//     css: jest.fn()
//   };
//   return jest.fn(() => m$);
// });

describe('整合測試-組件', () => {
  it('測試 Header 組件(模擬 redux 連動)', async () => {
    // 因組件包含 JQuery 函式庫，導致測試失敗
    const initialState = {
      system: {
        member: {}
      },
      layout: {
        header: [],
        footer: []
      }
    };
    // const { getByText } = renderWithRedux(<Header />, initialState);
    const { store } = renderWithRedux(<Header />, initialState);
    expect(screen.queryByText(/會員中心/i)).not.toBeInTheDocument(); // 查詢
    // 模擬送出 Action
    act(() => {
      store.dispatch(initialHeaderAndFooterDoneAction({ header: headerData, footer: [] }));
    });
    await waitFor(() => {
      expect(screen.getByText(/會員中心/i)).toBeInTheDocument();
    });
    // 根據角色查找 Home
    const home = screen.getByRole('button', { name: /首頁/i });
    expect(home).toBeInTheDocument();
  });

  it('測試 Footer 組件(渲染)', () => {
    const { getByTestId } = render(<Footer />);
    
    // 測試「聯絡訊息」區塊
    expect(screen.getByText(/聯絡訊息/i)).toBeInTheDocument();

    // 測試「保戶服務」區塊
    const elem = screen.getAllByText(/保戶服務/i);
    expect(elem).toHaveLength(2);
    if (elem.length > 1) {
      elem.forEach(it => {
        expect(it).toBeInTheDocument();
      })
    }

    // 測試「條款政策」區塊
    expect(getByTestId('terms')).toHaveTextContent('條款政策');
    // expect(screen.getAllByText(/條款政策/i)).toHaveLength(2);

    // 測試「相關連結」區塊
    expect(getByTestId('links')).toHaveTextContent('相關連結');
    // expect(screen.getAllByText(/相關連結/i)).toHaveLength(2);
  })
});
