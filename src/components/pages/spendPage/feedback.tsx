import React, { useRef, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

type FeedbackRating = {
  stars: number;
  count: number;
};

type FeedbackComment = {
  id: number;
  author: string;
  rating: number;
  comment: string;
};

type FeedbackPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    totalFeedback: number;
    growth: number;
    averageRating: number;
    ratings: FeedbackRating[];
    comments: FeedbackComment[];
  };
};

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose, data }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div 
            ref={popupRef}
            className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl max-h-[90vh] overflow-hidden"
        >
            <div className="p-6 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold font-inter">Feedback</h2>
                    <div className="flex items-center">
                        <button className="text-gray-400 hover:text-gray-500">
                            <span className="px-3 py-1.5 text-sm border rounded-md">10 Mar - Sekarang</span>
                        </button>
                    </div>
                </div>
                
                <div className="flex gap-3 md:gap-5 mb-3 border-b border-gray-200 pb-4">
                    <div className="w-auto border-r border-gray-200 pr-5">
                        <div className="mb-2 text-[7px] lg:text-xs text-gray-500">Total Feedback</div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg lg:text-3xl font-bold">{data.totalFeedback}</h3>
                            <div className="flex bg-[#F97066] text-white justify-center item-center rounded px-1 lg:px-2 py-[2px]">
                                <span className="text-[5px] lg:text-[8px] font-normal font-inter mr-1">{data.growth}</span>
                                <TrendingUp size={10}/>
                            </div>
                        </div>
                        <div className="text-[5px] lg:text-[8px] font-inter font-normal text-gray-500 mt-1">Pertumbuhan feedback signifikan</div>
                    </div>

                    <div className="w-auto border-r border-gray-200 md:pr-5">
                        <div className="mb-2 text-[7px] lg:text-xs text-gray-500">Rata Rata Rating</div>
                        <div className="flex items-center">
                            <h3 className="text-lg lg:text-3xl font-bold">{data.averageRating.toFixed(1)}</h3>
                            <div className="ml-3 flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={`text-[8px] lg:text-2xl ${star <= data.averageRating ? 'text-[#1877AA]' : 'text-[#E9EAEB]'}`}>★</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-[5px] lg:text-[8px] font-inter font-normal text-gray-500 mt-1">Pertumbuhan rating signifikan</div>
                    </div>
        
                    <div className="w-1/4 px-1 md:px-0">
                        {data.ratings.map((rating) => (
                            <div key={rating.stars} className="flex items-center">
                                <div className="flex items-center">
                                    <span className="text-[#1877AA] text-[8px] md:text-xs mr-0.5 md:mr-1">★</span>
                                    <span className="text-[5px] lg:text-[8px] font-bold font-inter">{rating.stars}</span>
                                </div>
                                <div className="relative flex-1 h-1 lg:h-2 bg-gray-200 rounded-full overflow-hidden mx-1 md:mx-2">
                                    <div 
                                        className="absolute h-full bg-[#1877AA]"
                                        style={{ width: `${(rating.count / data.totalFeedback) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="min-w-[24px] md:min-w-[32px] flex items-center">
                                    <span className="text-[5px] lg:text-[8px] font-bold font-inter">
                                        {rating.count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className="space-y-2">
                    {data.comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-100 pb-2">
                            <div className="flex flex-col items-start mb-2">
                                <h4 className="font-bold text-sm">{comment.author}</h4>
                                <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={`text-sm ${star <= comment.rating ? 'text-black' : 'text-[#E9EAEB]'}`}>★</span>
                                ))}
                                </div>
                            </div>
                            <p className="text-xs font-medium font-inter text-gray-700 leading-relaxed">{comment.comment}</p>
                        </div>
                    ))}
                </div>
    
                <div className="mt-3 flex justify-end">
                    <button 
                        className="px-12 py-1 text-sm font-inter font-medium bg-[#1877AA] text-white rounded-md hover:bg-blue-600"
                        onClick={onClose}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FeedbackPopup;