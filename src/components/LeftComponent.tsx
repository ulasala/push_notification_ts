import { useRowContext } from '../context/RowContext';

type Props = {
  updateSelectedId: (index: number) => void;
};

const LeftComponent: React.FC<Props> = ({ updateSelectedId }: Props) => {
  const { state } = useRowContext();

  const handleClick = (index: number) => {
    updateSelectedId(index);
  };

  return (
    <div className=" border border-gray-300 rounded p-9 flex flex-col items-start col-span-4">
      {state?.map((item) => (
        <div
          key={item.rowId}
          onClick={() => handleClick(item.rowId)}
          className={`w-[60%] p-4 mb-5 rounded shadow cursor-pointer hover:bg-red-200 
                  ${item.isSubmitted ? 'bg-yellow-300' : null} ${
            item.isNotified ? 'bg-green-300' : null
          }
                  ${
                    !item.isSubmitted && !item.isNotified ? 'bg-gray-300' : null
                  }`}
        >
          Clickable Row {item.rowId + 1}
        </div>
      ))}
    </div>
  );
};

export default LeftComponent;
