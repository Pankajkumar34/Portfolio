const ExprienceSec=({updateSection,handleSave,saving,sections}:any)=>{
    return(
       <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Experience Section</h2>
                <button
                  onClick={() => handleSave('experience')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {(sections.experience || []).map((exp: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <input
                        type="text"
                        value={exp.role || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
                          newExp[index].role = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
                          newExp[index].company = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <input
                        type="text"
                        value={exp.duration || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
                          newExp[index].duration = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Link</label>
                      <input
                        type="text"
                        value={exp.link || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
                          newExp[index].link = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Points (one per line)</label>
                    <textarea
                      value={(exp.points || []).join('\n')}
                      onChange={(e) => {
                        const newExp = [...(sections.experience || [])];
                        newExp[index].points = e.target.value.split('\n').filter((p: string) => p.trim());
                        updateSection('experience', newExp);
                      }}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
    )
}

export default ExprienceSec