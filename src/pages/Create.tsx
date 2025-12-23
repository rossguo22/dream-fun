import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDreams } from '../context/DreamsContext';
import { mockUser } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/format';

type Step = 1 | 2 | 3;

export default function Create() {
  const navigate = useNavigate();
  const { addDream } = useDreams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    story: '',
    imageFile: null as File | null,
    targetAmount: '',
    deadline: '',
  });

  // Set default deadline to 7 days from now at midnight
  useEffect(() => {
    if (!formData.deadline) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      defaultDate.setHours(0, 0, 0, 0);
      const dateString = defaultDate.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, deadline: dateString }));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, imageFile: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.title || !formData.story || !formData.imageFile) {
        alert('Please fill in all required fields including the dream image');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.targetAmount || !formData.deadline) {
        alert('Please fill in target amount and deadline');
        return;
      }
      const amount = parseFloat(formData.targetAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid target amount');
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = () => {
    if (!formData.imageFile) {
      alert('Please upload a dream image');
      return;
    }

    // Convert image file to data URL for storage (in real app, upload to server)
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      
      // Create the dream
      addDream({
        title: formData.title,
        story: formData.story,
        image: imageDataUrl,
        creator: {
          id: mockUser.id,
          name: mockUser.name,
          avatar: mockUser.avatar,
        },
        targetAmount: parseFloat(formData.targetAmount),
        deadline: formData.deadline,
      });

      // Navigate to feed
      navigate('/');
    };
    reader.readAsDataURL(formData.imageFile);
  };

  const calculateDistribution = () => {
    const targetAmount = parseFloat(formData.targetAmount) || 0;
    const platformFee = targetAmount * 0.05;
    const dreamAmount = targetAmount - platformFee;
    return { targetAmount, platformFee, dreamAmount };
  };

  const distribution = calculateDistribution();

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={step > 1 ? handleBack : () => navigate('/')}
        className="mb-6 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Back</span>
      </button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Dream</h1>
        <p className="text-gray-600">Share your dream and make it happen together</p>
      </div>

      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step >= s
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                <span className="mt-2 text-sm text-gray-600">
                  {s === 1 ? 'Dream Info' : s === 2 ? 'Goal Setting' : 'Confirm'}
                </span>
              </div>
              {s < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > s ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Step 1: Dream Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dream Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., See Northern Lights in Iceland"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dream Story *
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => handleInputChange('story', e.target.value)}
                placeholder="Share your dream story..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dream Image *
              </label>
              {!imagePreview ? (
                <div className="mt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="mt-1 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Step 2: Goal Setting</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount *
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={formData.targetAmount}
                onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                placeholder="e.g., 50000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline *
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Default: 7 days from now at midnight
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Step 3: Confirmation</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              {/* Dream Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Dream Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Title:</span>
                    <p className="text-gray-900 mt-1">{formData.title}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Story:</span>
                    <p className="text-gray-900 mt-1 whitespace-pre-line">{formData.story}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Image:</span>
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Dream preview"
                          className="w-full max-w-md h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Goal Setting */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Goal Setting</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Target Amount:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(distribution.targetAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Deadline:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(formData.deadline)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Distribution */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Fund Distribution</h3>
                <div className="bg-white p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Funds:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(distribution.targetAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee (5%):</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(distribution.platformFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Dream Fulfillment:</span>
                    <span className="font-semibold text-primary-600">
                      {formatCurrency(distribution.dreamAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className={`mt-8 flex ${step === 1 || step === 2 ? 'justify-center' : 'justify-end'}`}>
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Continue
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Re-edit
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Create Dream
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
