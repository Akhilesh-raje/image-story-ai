
interface ResultsHeaderProps {
  captionsCount: number;
}

const ResultsHeader = ({ captionsCount }: ResultsHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Your AI-Generated Captions
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Professional-grade captions with engagement predictions
      </p>
    </div>
  );
};

export default ResultsHeader;
