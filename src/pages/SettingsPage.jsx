import { useState } from "react";
import { CATEGORIES, PAYMENT_METHODS } from "../utils/constants.js";
import "./SettingsPage.css";

const DEFAULT_SETTINGS = {
  expenseCategories: CATEGORIES,
  paymentMethods: PAYMENT_METHODS,
  savingLocations: ["carteira", "conta bancaria", "reserva", "investimentos"]
};

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function ListEditor({ title, items = [], inputValue, onInputChange, onAdd, onRemove }) {
  return (
    <section className="settings-page__group">
      <h3>{title}</h3>
      <div className="settings-page__inline">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="Novo item..."
        />
        <button className="day5__button" type="button" onClick={onAdd}>
          Adicionar
        </button>
      </div>
      <ul className="settings-page__chips">
        {items.map((item) => (
          <li key={item}>
            <span>{item}</span>
            <button type="button" onClick={() => onRemove(item)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SettingsPage({
  settings = DEFAULT_SETTINGS,
  onSettingsChange,
  monthlyGoal = 0,
  onMonthlyGoalChange
}) {
  const safeSettings = { ...DEFAULT_SETTINGS, ...settings };
  const [goalDraft, setGoalDraft] = useState(String(monthlyGoal));
  const [categoryInput, setCategoryInput] = useState("");
  const [methodInput, setMethodInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  function addItem(key, rawValue) {
    const value = normalizeText(rawValue);
    if (!value) return;
    onSettingsChange?.((prev) => {
      const base = { ...DEFAULT_SETTINGS, ...(prev ?? {}) };
      if (base[key].includes(value)) return base;
      return { ...base, [key]: [...base[key], value] };
    });
  }

  function removeItem(key, valueToRemove) {
    onSettingsChange?.((prev) => {
      const base = { ...DEFAULT_SETTINGS, ...(prev ?? {}) };
      const next = base[key].filter((item) => item !== valueToRemove);
      return { ...base, [key]: next.length > 0 ? next : base[key] };
    });
  }

  function saveSettings() {
    const parsedGoal = Number(goalDraft);
    onMonthlyGoalChange?.(Number.isFinite(parsedGoal) ? parsedGoal : 0);
  }

  return (
    <section className="settings-page">
      <header className="settings-page__header">
        <h1 className="settings-page__title">Configuracoes</h1>
        <p className="settings-page__subtitle text-muted">
          Ajuste categorias, formas de pagamento, locais de reserva e meta mensal.
        </p>
      </header>

      <section className="settings-page__group">
        <h3>Meta mensal</h3>
        <div className="settings-page__inline">
          <input
            type="number"
            min="0"
            step="0.01"
            value={goalDraft}
            onChange={(event) => setGoalDraft(event.target.value)}
          />
          <button className="day5__button" type="button" onClick={saveSettings}>
            Salvar meta
          </button>
        </div>
      </section>

      <ListEditor
        title="Categorias"
        items={safeSettings.expenseCategories}
        inputValue={categoryInput}
        onInputChange={setCategoryInput}
        onAdd={() => {
          addItem("expenseCategories", categoryInput);
          setCategoryInput("");
        }}
        onRemove={(item) => removeItem("expenseCategories", item)}
      />

      <ListEditor
        title="Formas de pagamento"
        items={safeSettings.paymentMethods}
        inputValue={methodInput}
        onInputChange={setMethodInput}
        onAdd={() => {
          addItem("paymentMethods", methodInput);
          setMethodInput("");
        }}
        onRemove={(item) => removeItem("paymentMethods", item)}
      />

      <ListEditor
        title="Locais de reserva"
        items={safeSettings.savingLocations}
        inputValue={locationInput}
        onInputChange={setLocationInput}
        onAdd={() => {
          addItem("savingLocations", locationInput);
          setLocationInput("");
        }}
        onRemove={(item) => removeItem("savingLocations", item)}
      />
    </section>
  );
}
