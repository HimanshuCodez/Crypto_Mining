import React from 'react';

const SettingsPage = ({ barcodeUrl, setBarcodeUrl, handleUpdateBarcode }) => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-10 font-[Montserrat]">
      <h2 className="text-3xl font-bold text-white">Barcode Update</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex-1">
        <h3 className="text-xl font-semibold text-white mb-4">Deposit Barcode</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Barcode Image URL</label>
            <input type="text" placeholder="Enter barcode image URL" value={barcodeUrl} onChange={(e) => setBarcodeUrl(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
          </div>
          {barcodeUrl && (
            <div>
              <p className="block text-sm font-medium text-gray-300 mb-1">Current Barcode:</p>
              <img src={barcodeUrl} alt="Current Deposit Barcode" className="w-48 h-48 rounded-lg border-2 border-gray-600" />
            </div>
          )}
          <button onClick={handleUpdateBarcode} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors shadow-md shadow-cyan-500/20">Update Barcode</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
