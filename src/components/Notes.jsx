function Notes({ text }) {
  return (
    <div className="mt-6 border rounded p-4 bg-gray-50">
      <h3 className="font-semibold mb-2">Notities</h3>
      <p>{text}</p>
    </div>
  );
}

export default Notes;
