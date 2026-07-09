import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GroupListScreen from '../../src/screens/reading-group/GroupListScreen';
import { useMyGroups } from '../../src/hooks/reading-group/useGroups';

jest.mock('../../src/hooks/reading-group/useGroups');
// 화면 포커스마다 재조회하는 useFocusEffect는 NavigationContainer 없이는
// 못 쓰므로(useNavigation 필요), 이 테스트에서는 콜백만 즉시 실행하도록 대체한다.
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (callback: () => void) => callback(),
}));

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate, replace: jest.fn() } as any;

const SAFE_AREA_METRICS = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

// NavBar가 useSafeAreaInsets()를 쓰므로 SafeAreaProvider로 감싸서 렌더링한다.
function renderScreen() {
  return render(
    <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
      <GroupListScreen navigation={mockNavigation} route={{} as any} />
    </SafeAreaProvider>
  );
}

describe('GroupListScreen', () => {
  it('참여 모임 카드를 렌더링한다', () => {
    (useMyGroups as jest.Mock).mockReturnValue({
      groups: [
        {
          id: 1, name: '한강 읽기 모임', description: null,
          max_member: 8, member_count: 5,
          invite_code: 'RDLG-0001',
          start_date: null, end_date: null, created_at: '',
          book_id: null, owner_id: 1,
        },
      ],
      loading: false,
      refresh: jest.fn(),
    });

    const { getByText } = renderScreen();
    expect(getByText('한강 읽기 모임')).toBeTruthy();
    expect(getByText('5/8명')).toBeTruthy();
  });

  it('로딩 중에는 빈 FlatList를 보여준다', () => {
    (useMyGroups as jest.Mock).mockReturnValue({ groups: [], loading: true, refresh: jest.fn() });
    const { queryByText } = renderScreen();
    expect(queryByText('한강 읽기 모임')).toBeNull();
  });
});
