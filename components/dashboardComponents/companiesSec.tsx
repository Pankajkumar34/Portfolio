const LastCompnieseSec=({updateSection,handleSave,saving,sections}:any)=>{
    return(
             <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Companies Section</h2>
                <button
                  onClick={() => handleSave('companies')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {(sections.companies || []).map((company: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Company {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={company.name || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
                          newCompanies[index].name = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Period</label>
                      <input
                        type="text"
                        value={company.period || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
                          newCompanies[index].period = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Logo URL</label>
                      <input
                        type="text"
                        value={company.logo || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
                          newCompanies[index].logo = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Website Link</label>
                      <input
                        type="text"
                        value={company.link || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
                          newCompanies[index].link = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={company.description || ''}
                      onChange={(e) => {
                        const newCompanies = [...(sections.companies || [])];
                        newCompanies[index].description = e.target.value;
                        updateSection('companies', newCompanies);
                      }}
                      rows={2}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
    )
}

export default LastCompnieseSec