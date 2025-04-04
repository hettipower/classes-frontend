import { format } from 'date-fns';

import MDTypography from "components/MDTypography";

// Authentication Functions
import { getLoginData } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';

const { token } = getLoginData();

export const getCorporate = async (corporateId) => {
    try {
        const response = await axiosInstance.get(`/corporates/${corporateId}`, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
  
        if (response.data.status && response.data.data.corporate_id === corporateId) {
            return response.data.data.corporate_name;
        }
  
        // Return null or any default value if no data found or IDs don't match
        return null;
  
    } catch (error) {
        return null;
    }
};

export const getCategory = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/staff/categories/${categoryId}`, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
  
        if (response.data.status && response.data.data.category_id === categoryId) {
            return response.data.data.category_name;
        }
  
        // Return null or any default value if no data found or IDs don't match
        return null;
  
    } catch (error) {
        return null;
    }
}

export const getCompany = async (companyId) => {
    try {
        const response = await axiosInstance.get(`/insurance/company/${companyId}`, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
  
        if (response.data.status && response.data.data.company_id === companyId) {
            return response.data.data.company_name;
        }
  
        // Return null or any default value if no data found or IDs don't match
        return null;
  
    } catch (error) {
        return null;
    }
}

export const getPolicy = async (policyId) => {
    try {
        const response = await axiosInstance.get(`/policies/policyId/${policyId}`, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
  
        if (response.data.status && response.data.data.policy_id === policyId) {
            return response.data.data.policy_number;
        }
  
        // Return null or any default value if no data found or IDs don't match
        return null;
  
    } catch (error) {
        return null;
    }
}

export const getPlan = async (planId) => {
    try {
        const response = await axiosInstance.get(`/policy/plans/${planId}`, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
  
        if (response.data.status && response.data.data.plan_id === planId) {
            return response.data.data.plan_name;
        }
  
        // Return null or any default value if no data found or IDs don't match
        return null;
  
    } catch (error) {
        return null;
    }
}

export const getMember = async (memberId) => {
    try {
        const response = await axiosInstance.get(`/members/${memberId}`, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
  
        if (response.data.status && response.data.data.member_id === memberId) {
            return response.data.data.name;
        }
  
        // Return null or any default value if no data found or IDs don't match
        return null;
  
    } catch (error) {
        return null;
    }
}

export const uploadFile = async (fileObj) => {
    try {

        const formData = new FormData();
        formData.append("file", fileObj);

        const { token: uploadToken } = getLoginData();

        const response = await axiosInstance.post(`/utils/upload`, formData, {
            headers: { 
                'Authorization': `Bearer ${uploadToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
  
        if (response.data.status) {
            return response.data.data.key;
        }
  
        // Return null or any default value if no data found or IDs don't match
        return null;
  
    } catch (error) {
        return null;
    }
}

export const isFileObject = (file) => file instanceof File && file.name && file.size && file.type;

export const isNumber = (value) => typeof value === 'number' && !value.isNaN;

export const formattedDate = (date) => date ? format(new Date(date), "dd-MM-yyyy hh:mm a") : '';

export const formattedDateV2 = (date) => date ? format(new Date(date), "dd-MM-yyyy") : <MDTypography variant="caption" color="error">Not Available</MDTypography>;

export const formattedDateV3 = (date) => date ? format(new Date(date), "yyyy-MM-dd") : '';

export const numberFormatter = (value) => new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2, // Number of decimal places
      maximumFractionDigits: 2,
    }).format(value || 0);

export const getStorageCaseMember = () => {
    const storageCaseMember = JSON.parse(localStorage.getItem('storageCaseMember'));
    
    return storageCaseMember ?? false;
};

export const getStorageCases = () => {
    const storageCases = JSON.parse(localStorage.getItem('storageCases'));
    
    return storageCases ?? false;
};

export const getSearchData = () => {
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    
    return searchData ?? false;
};

export const removeStorage = () => {
    localStorage.removeItem('searchData');
    return true;
};

export const removeLeadingZero = (number) => {
    // Convert the number to a string if it's not already
    const numberStr = number.toString();

    // Remove the first character if it's '0'
    if (numberStr.startsWith('0')) {
        return numberStr.slice(1);
    }

    // Return the original number if no leading zero
    return numberStr;
};

export const scaleImage = (file, maxSizeMb) => new Promise((resolve, reject) => {
    const reader = new FileReader();
  
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
    
            const scaleFactor = Math.sqrt(
                (file.size / (maxSizeMb * 1024 * 1024))
            );
            const width = img.width / scaleFactor;
            const height = img.height / scaleFactor;
    
            canvas.width = width;
            canvas.height = height;
    
            ctx.drawImage(img, 0, 0, width, height);
    
            canvas.toBlob(
                (blob) => {
                    if (blob && blob.size <= maxSizeMb * 1024 * 1024) {
                        resolve(blob);
                    } else {
                        reject(new Error("Unable to scale down image."));
                    }
                },
                file.type,
                0.8 // Adjust compression quality (0.8 is good balance)
            );
        };

        img.onerror = reject;
    };
  
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export const processNumber = (number) => {
    // Convert the number to a string if it isn't already
    const numberStr = number.toString();

    // Check if the number starts with "07" and remove it
    if (numberStr.startsWith("07")) {
        return numberStr.slice(2); // Remove the first two characters
    }
    
    // Return the original number if it doesn't start with "07"
    return numberStr;
};

export const getCurrentAndPrevDate = () => {
    const currentDate = new Date();
  
    // Format current date as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const currentFormatted = formatDate(currentDate);
  
    // Get previous date
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    const prevFormatted = formatDate(prevDate);
  
    return { current: currentFormatted, previous: prevFormatted };
};

export const convertImageToDataURL = async (imageUrl) => (new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Allow cross-origin images (important for external URLs)
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageUrl;
}));

export const transformDashboardData = (dashboardData , colors) => (dashboardData.map((dashboard, index) => {
    const labels = dashboard.dashboard_data[0].datasets.map((dataset) => dataset.label);
    const data = dashboard.dashboard_data[0].datasets.map((dataset) => Array.isArray(dataset.data) ? dataset.data : [dataset.data]);
    const datasets = [
      {
        label: dashboard.dashboard_name,
        color: colors[index % colors.length], // Assign colors dynamically
        data,
      },
    ];

    return {
      labels,
      datasets,
    };
}));