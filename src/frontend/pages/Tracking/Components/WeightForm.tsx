

// Props for controlled weight input form
type WeightFormProps = {
    weight: string;
    date: string;
    notes: string;
    setWeight: (value: string) => void;
    setDate: (value: string) => void;
    setNotes: (value: string) => void;
    handleSave: () => void;
};

function WeightForm({
    weight,
    date,
    notes,
    setWeight,
    setDate,
    setNotes,
    handleSave,
}: WeightFormProps) {
    return (
        <div className="bg-white flex flex-col gap-5 p-5 rounded-xl">
            <h2 className="text-xl font-bold">Log Weight</h2>

            {/* Input for weight value */}
            <section>
                <h3>Weight Value</h3>
                <input
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    placeholder="00.00"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                />
            </section>

            {/* Date of the weight entry */}
            <section>
                <h3>Date</h3>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-blue-100 rounded-xl h-10 w-full outline-none p-3"
                />
            </section>

            {/* Optional notes field for extra context */}
            <section>
                <h3>Optional Notes</h3>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How are you feeling today?"
                    className="bg-blue-100 rounded-xl h-30 w-full outline-none p-3 resize-none"
                />
            </section>

            {/* Triggers save logic in parent component */}
            <button
                onClick={handleSave}
                className="bg-[#1B3022] rounded-2xl text-white h-10 hover:bg-[#3b674a]"
            >+ Save Entry</button>
        </div>
    );
}

export default WeightForm;