import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLinkStart, createLinkSuccess, createLinkFailure } from '../store/linksSlice';
import { linkService } from '../services/api';
import { CreateLinkData } from '../types';

const CreateLinkForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateLinkData>({
    originalUrl: '',
    alias: '',
    expirationDate: undefined,
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    dispatch(createLinkStart());

    try {
      const data = await linkService.createLink(formData);
      dispatch(createLinkSuccess(data));
      setFormData({
        originalUrl: '',
        alias: '',
        expirationDate: undefined,
      });
    } catch (err) {
      setError('Failed to create link');
      dispatch(createLinkFailure('Failed to create link'));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Short Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700">
            Original URL
          </label>
          <input
            type="url"
            id="originalUrl"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.originalUrl}
            onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="alias" className="block text-sm font-medium text-gray-700">
            Custom Alias (optional)
          </label>
          <input
            type="text"
            id="alias"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.alias}
            onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
            Expiration Date (optional)
          </label>
          <input
            type="datetime-local"
            id="expirationDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.expirationDate ? new Date(formData.expirationDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => setFormData({ ...formData, expirationDate: new Date(e.target.value) })}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Short Link
        </button>
      </form>
    </div>
  );
};

export default CreateLinkForm; 