function Instructions({ steps }) {
  return (
    <ol className="list-decimal list-inside mt-6 space-y-2">
      {steps.map((step, idx) => (
        <li key={idx}>{step}</li>
      ))}
    </ol>
  );
}

export default Instructions;
