// components/CampoDeDescricao.jsx
export const CampoDeDescricao = ({ valor, onChange }) => (
    <div>
      <label className="block text-lg font-medium text-dark mb-3">
        Descreva sua necessidade *
      </label>
  
      <textarea
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light"
        rows={4}
        placeholder="Ex: Gostaria de ser seu paciente. Preciso de ajuda com ansiedade, tenho disponibilidade nas manhãs de segunda a quarta..."
        required
      />
    </div>
  );
  