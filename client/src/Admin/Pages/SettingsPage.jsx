import React from 'react';

const SettingsPage = ({ barcodeUrls, setBarcodeUrls, handleUpdateBarcode }) => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-10 font-[Montserrat]">
      <h2 className="text-3xl font-bold text-white">Barcode Update</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex-1">
        <h3 className="text-xl font-semibold text-white mb-4">BEP 20 Barcode</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Barcode Image URL</label>
            <input type="text" placeholder="Enter barcode image URL" value={barcodeUrls.deposit} onChange={(e) => setBarcodeUrls({ ...barcodeUrls, deposit: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">BEP20 Wallet Address</label>
            <input type="text" placeholder="Enter BEP20 wallet address" value={barcodeUrls.depositAddress || ''} onChange={(e) => setBarcodeUrls({ ...barcodeUrls, depositAddress: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
          </div>
          {barcodeUrls.deposit && (
            <div>
              <p className="block text-sm font-medium text-gray-300 mb-1">Current Deposit Barcode:</p>
              <img src={barcodeUrls.deposit} alt="Current Deposit Barcode" className="w-48 h-48 rounded-lg border-2 border-gray-600" />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex-1">
        <h3 className="text-xl font-semibold text-white mb-4">TRC20 Barcode</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Barcode Image URL</label>
            <input type="text" placeholder="Enter TRE20 barcode image URL" value={barcodeUrls.tre20} onChange={(e) => setBarcodeUrls({ ...barcodeUrls, tre20: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">TRC20 Wallet Address</label>
            <input type="text" placeholder="Enter TRC20 wallet address" value={barcodeUrls.tre20Address || ''} onChange={(e) => setBarcodeUrls({ ...barcodeUrls, tre20Address: e.target.value })} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
          </div>
          {barcodeUrls.tre20 && (
            <div>
              <p className="block text-sm font-medium text-gray-300 mb-1">Current TRE20 Barcode:</p>
              <img src={barcodeUrls.tre20} alt="Current TRE20 Barcode" className="w-48 h-48 rounded-lg border-2 border-gray-600" />
            </div>
          )}
        </div>
      </div>

      <button onClick={() => handleUpdateBarcode(barcodeUrls)} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors shadow-md shadow-cyan-500/20 max-w-max">Update All Barcodes</button>
    </div>
  );
}

export default SettingsPage;
