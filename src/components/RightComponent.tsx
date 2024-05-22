import ComponentOne from './ComponentOne';
import ComponentTwo from './ComponentTwo';
import ComponentThree from './ComponentThree';

type Props = {
  selectedId: number;
};

const RightComponent: React.FC<Props> = ({ selectedId }: Props) => {
  return (
    <div className="col-span-8 border border-gray-300 rounded ">
      {selectedId === 0 ? <ComponentOne id={selectedId} /> : null}
      {selectedId === 1 ? <ComponentTwo id={selectedId} /> : null}
      {selectedId === 2 ? <ComponentThree id={selectedId} /> : null}
    </div>
  );
};

export default RightComponent;
