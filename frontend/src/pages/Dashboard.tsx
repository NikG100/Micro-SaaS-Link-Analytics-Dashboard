import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getLinksStart, getLinksSuccess, getLinksFailure } from '../store/linksSlice';
import { linkService } from '../services/api';
import CreateLinkForm from '../components/CreateLinkForm';
import LinksTable from '../components/LinksTable';
import AnalyticsChart from '../components/AnalyticsChart';
import { Link } from '../types';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { links, loading } = useSelector((state: RootState) => state.links);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      dispatch(getLinksStart());
      try {
        const data = await linkService.getLinks();
        dispatch(getLinksSuccess(data));
      } catch (error) {
        dispatch(getLinksFailure('Failed to fetch links'));
      }
    };

    fetchLinks();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Link Analytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CreateLinkForm />
          <div className="mt-8">
            <LinksTable
              links={links}
              loading={loading}
              onSelectLink={setSelectedLink}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedLink ? (
            <AnalyticsChart link={selectedLink} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-center">
                Select a link to view analytics
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 