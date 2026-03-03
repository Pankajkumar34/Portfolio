const SkillsSec=({updateSection,handleSave,saving,sections}:any)=>{
    return(
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile Section</h2>
                <button
                  onClick={() => handleSave('profile')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                {(sections.profile.personalDetails || []).map((detail: any, index: number) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={detail.label || ''}
                      onChange={(e) => {
                        const newDetails = [...(sections.profile.personalDetails || [])];
                        newDetails[index].label = e.target.value;
                        updateSection('profile', { ...sections.profile, personalDetails: newDetails });
                      }}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={detail.value || ''}
                      onChange={(e) => {
                        const newDetails = [...(sections.profile.personalDetails || [])];
                        newDetails[index].value = e.target.value;
                        updateSection('profile', { ...sections.profile, personalDetails: newDetails });
                      }}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      placeholder="Value"
                    />
                  </div>
                ))}

                <h3 className="text-lg font-semibold pt-4">Map Embed URL</h3>
                <input
                  type="text"
                  value={sections.profile.mapEmbed || ''}
                  onChange={(e) => updateSection('profile', { ...sections.profile, mapEmbed: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                />
              </div>
            </div>
    )
}

export default SkillsSec