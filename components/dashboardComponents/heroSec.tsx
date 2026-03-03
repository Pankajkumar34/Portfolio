const HeroSec=({updateSection,handleSave,saving,sections}:any)=>{
    return(
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Hero Section</h2>
                <button
                  onClick={() => handleSave('hero')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={sections.hero.title || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={sections.hero.subtitle || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={sections.hero.name || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <input
                    type="text"
                    value={sections.hero.profileImage || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, profileImage: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CV Link</label>
                  <input
                    type="text"
                    value={sections.hero.cvLink || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, cvLink: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Link</label>
                  <input
                    type="text"
                    value={sections.hero.githubLink || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, githubLink: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={sections.hero.openToWork || false}
                    onChange={(e) => updateSection('hero', { ...sections.hero, openToWork: e.target.checked })}
                    className="w-5 h-5 rounded bg-gray-700 border-gray-600"
                  />
                  <label className="text-sm font-medium">Open to Work</label>
                </div>
              </div>
            </div>
    )
}

export default HeroSec