import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {strict as assert} from 'assert';
import _ from 'lodash';
import {action, configure as configureMobx, toJS} from 'mobx';
import {observer, useLocalObservable} from 'mobx-react-lite';
import {useEffect} from 'react';

configureMobx({
  computedRequiresReaction: true,
  enforceActions: 'never',
  reactionRequiresObservable: true,
});

type Dimension = {
  id: string;
  name: string;
};

const dimensions: Record<Dimension['id'], Dimension> = {
  bounceRate: {id: 'bounceRate', name: 'Отказы'},
  durationSeconds: {id: 'durationSeconds', name: 'Время на сайте'},
  pages: {id: 'pages', name: 'Глубина просмотра'},
  uniqUsers: {id: 'uniqUsers', name: 'Посетители'},
  visits: {id: 'visits', name: 'Визиты'},
};

type Item = {
  ids: Array<string>;
  values: Array<number>;
};

const items: Array<Item> = [
  {ids: ['0'], values: [8361736, 4094771, 0.3678, 7.2424, 292.7852]},
  {ids: ['24'], values: [7226207, 3979844, 0.3689, 8.1409, 368.1386]},
  {ids: ['48'], values: [8408238, 4061772, 0.3682, 7.2128, 292.5736]},
  {ids: ['72'], values: [8744015, 4388622, 0.4089, 7.0817, 281.7723]},
  {ids: ['96'], values: [6095839, 4117435, 0.4348, 10.2918, 481.4686]},
  {ids: ['120'], values: [5710123, 3660156, 0.363, 11.5275, 544.1207]},
  {ids: ['144'], values: [1186017, 1025355, 0.4466, 7.9546, 356.7496]},
];

type State = {
  dimensionId: string;
  dimensionsIds: Array<string>;
  tableColumns: ColumnsType<Item>;
};

const groupingColumn: ColumnsType<Item>[number] = {
  key: 'grouping',
  render: action((__, item) => JSON.stringify(item.ids)),
};

const App = observer(() => {
  const state = useLocalObservable<State>(() => ({
    dimensionId: dimensions.visits.id,
    dimensionsIds: [
      dimensions.visits.id,
      dimensions.uniqUsers.id,
      dimensions.bounceRate.id,
      dimensions.pages.id,
      dimensions.durationSeconds.id,
    ],
    tableColumns: [groupingColumn],
  }));

  useEffect(() => {
    setTimeout(() => {
      state.tableColumns = [
        groupingColumn,

        ...state.dimensionsIds.map((dimId, dimIndex) => ({
          align: 'right' as const,
          key: dimId,
          render: action((__: unknown, item: Item) => item.values[dimIndex]),
          sortDirections: [],
          sorter: true,
          title: dimensions[dimId].name,
        })),
      ];
    }, 2000);
  }, [state]);

  return (
    <div className="p1 bg-blue">
      <Table
        bordered
        columns={toJS(state.tableColumns)}
        dataSource={items}
        onChange={(__, ___, sorter) => {
          assert(!Array.isArray(sorter), 'Should not be an array');
          assert(typeof sorter.columnKey === 'string', 'String expected');

          if (!_.map(dimensions, 'id').includes(sorter.columnKey)) {
            state.dimensionId = dimensions.visits.id;
            return;
          }

          state.dimensionId = sorter.columnKey;
        }}
        pagination={false}
        rowKey={({ids}) => JSON.stringify(ids)}
        showSorterTooltip={false}
      />
    </div>
  );
});

export default App;
