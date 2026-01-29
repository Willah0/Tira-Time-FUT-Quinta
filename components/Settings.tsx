import React, { useEffect } from 'react';
import { AppSettings } from '../types';
import { Moon, Sun, Shield, Users, Trash2 } from 'lucide-react';

interface Props {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  resetData: () => void;
  onGenerateDemoData: () => void;
}

// Map of suggested formations based on Total Players per Team (including GK)
const FORMATIONS_BY_SIZE: Record<number, { label: string; value: string }[]> = {
    5: [ // 1 GK + 4 Line
        { label: 'Losango (1-2-1) - Equilibrado', value: '1-0-2-1' },
        { label: 'Quadrado (2-2) - Defensivo', value: '2-0-0-2' },
        { label: 'Y (1-1-2) - Ofensivo', value: '1-0-1-2' },
    ],
    6: [ // 1 GK + 5 Line
        { label: '2-1-2 (Equilibrado)', value: '2-0-1-2' },
        { label: '3-1-1 (Defensivo)', value: '1-2-1-1' }, 
        { label: '2-2-1 (Ofensivo)', value: '0-2-2-1' },
    ],
    7: [ // 1 GK + 6 Line
        { label: '3-2-1 (Society Padrão)', value: '1-2-2-1' },
        { label: '2-3-1 (Ofensivo)', value: '2-0-3-1' },
        { label: '4-1-1 (Retranca)', value: '2-2-1-1' },
    ],
    8: [ // 1 GK + 7 Line
        { label: '3-3-1 (Equilibrado)', value: '1-2-3-1' },
        { label: '3-2-2 (Ofensivo)', value: '1-2-2-2' },
        { label: '4-2-1 (Defensivo)', value: '2-2-2-1' },
    ],
    9: [ // 1 GK + 8 Line
        { label: '2-2-3-1 (Padrão 8 na Linha)', value: '2-2-3-1' },
        { label: '4-3-1 (Clássico)', value: '2-2-3-1' }, 
        { label: '3-3-2 (3-5-2 Adaptado)', value: '3-0-3-2' },
        { label: '2-2-2-2 (Ofensivo)', value: '2-2-2-2' },
    ],
    10: [ // 1 GK + 9 Line
        { label: '4-3-2 (4-4-2 Adaptado) - Padrão', value: '2-2-3-2' },
        { label: '4-4-1 (Defensivo)', value: '2-2-4-1' },
        { label: '3-3-3 (Ofensivo)', value: '3-0-3-3' },
    ],
    11: [ // 1 GK + 10 Line
        { label: '4-4-2 (Clássico)', value: '2-2-4-2' },
        { label: '4-3-3 (Ofensivo)', value: '2-2-3-3' },
        { label: '3-5-2 (Alas)', value: '3-0-5-2' },
        { label: '4-2-3-1 (Moderno)', value: '2-2-5-1' },
    ]
};

export const Settings: React.FC<Props> = ({ settings, onUpdateSettings, resetData, onGenerateDemoData }) => {
  
  // Update formation if player count changes
  useEffect(() => {
    const availableFormations = FORMATIONS_BY_SIZE[settings.playersPerTeam];
    if (availableFormations && availableFormations.length > 0) {
        const currentIsValid = availableFormations.some(f => f.value === settings.tacticalSchema);
        if (!currentIsValid) {
            onUpdateSettings({ ...settings, tacticalSchema: availableFormations[0].value });
        }
    } else {
        onUpdateSettings({ ...settings, tacticalSchema: '0-0-0-0' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.playersPerTeam]);

  const availableFormations = FORMATIONS_BY_SIZE[settings.playersPerTeam] || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-6 dark:text-white flex items-center gap-2">
            <Shield size={20} className="text-pitch-600" />
            Configurações
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tema</label>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-fit">
              <button
                onClick={() => onUpdateSettings({ ...settings, theme: 'light' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  settings.theme === 'light' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Sun size={16} /> Claro
              </button>
              <button
                onClick={() => onUpdateSettings({ ...settings, theme: 'dark' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  settings.theme === 'dark' 
                    ? 'bg-gray-600 text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Moon size={16} /> Escuro
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jogadores por Time</label>
                <select
                    value={settings.playersPerTeam}
                    onChange={(e) => onUpdateSettings({ ...settings, playersPerTeam: Number(e.target.value) })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pitch-500 focus:border-pitch-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                    <option value={5}>5 (Futsal)</option>
                    <option value={6}>6 (Society)</option>
                    <option value={7}>7 (Society)</option>
                    <option value={8}>8 (1 Goleiro + 7 Linha)</option>
                    <option value={9}>9 (1 Goleiro + 8 Linha)</option>
                    <option value={10}>10 (Padrão: 1 Goleiro + 9 Linha)</option>
                    <option value={11}>11 (Campo Oficial)</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Shield size={14} /> Formação Tática
                </label>
                <select
                    value={settings.tacticalSchema}
                    onChange={(e) => onUpdateSettings({ ...settings, tacticalSchema: e.target.value })}
                    disabled={availableFormations.length === 0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pitch-500 focus:border-pitch-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:opacity-50"
                >
                    {availableFormations.length > 0 ? (
                        availableFormations.map(f => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                        ))
                    ) : (
                        <option value="0-0-0-0">Padrão (Sem tática específica)</option>
                    )}
                </select>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Define a distribuição de Defensores, Laterais, Meias e Atacantes.
                </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
             <h3 className="text-gray-900 dark:text-white font-bold mb-4 text-sm uppercase">Gerenciamento de Dados</h3>
             
             <div className="flex flex-col gap-3">
                <button 
                    onClick={onGenerateDemoData}
                    className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    <Users size={18} />
                    Gerar 30 Jogadores (Teste)
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Apaga tudo e cadastra automaticamente 30 jogadores com posições variadas.
                </p>

                <button 
                    onClick={resetData}
                    className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-300 dark:border-red-800 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    <Trash2 size={18} />
                    Limpar Todos os Dados
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};